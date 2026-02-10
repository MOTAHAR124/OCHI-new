import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { load } from "cheerio";

const START_URL = "https://ochi.design";
const TARGET_HOST = "ochi.design";
const OUTPUT_DIR = path.join(process.cwd(), "public", "assets", "ochi");
const MANIFEST_PATH = path.join(process.cwd(), "data", "ochi-asset-manifest.json");
const MAX_PAGES = Number(process.env.OCHI_MAX_PAGES || 20);
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".svg",
  ".avif"
]);

function toAbsoluteUrl(candidate, base = START_URL) {
  if (!candidate) {
    return null;
  }
  try {
    return new URL(candidate, base).toString();
  } catch {
    return null;
  }
}

function extractCssUrls(input) {
  const found = [];
  const matcher = /url\((['"]?)(.*?)\1\)/gi;
  let match = matcher.exec(input);
  while (match) {
    found.push(match[2]);
    match = matcher.exec(input);
  }
  return found;
}

function extractSrcsetUrls(srcset) {
  return srcset
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => item.split(/\s+/)[0]);
}

function extFromContentType(contentType) {
  if (!contentType) {
    return "";
  }
  if (contentType.includes("image/jpeg")) {
    return ".jpg";
  }
  if (contentType.includes("image/png")) {
    return ".png";
  }
  if (contentType.includes("image/webp")) {
    return ".webp";
  }
  if (contentType.includes("image/gif")) {
    return ".gif";
  }
  if (contentType.includes("image/svg+xml")) {
    return ".svg";
  }
  if (contentType.includes("image/avif")) {
    return ".avif";
  }
  return "";
}

function isDownloadableImage(urlValue) {
  try {
    const parsed = new URL(urlValue);
    const hostAllowed =
      parsed.hostname === TARGET_HOST || parsed.hostname.endsWith(`.${TARGET_HOST}`);
    if (!hostAllowed) {
      return false;
    }
    const pathname = parsed.pathname.toLowerCase();
    const ext = path.extname(pathname);
    if (IMAGE_EXTENSIONS.has(ext)) {
      return true;
    }
    if (pathname.includes("/image/")) {
      return true;
    }
    return parsed.searchParams.has("format");
  } catch {
    return false;
  }
}

function isCrawlablePage(urlValue) {
  try {
    const parsed = new URL(urlValue);
    const hostAllowed =
      parsed.hostname === TARGET_HOST || parsed.hostname.endsWith(`.${TARGET_HOST}`);
    if (!hostAllowed) {
      return false;
    }
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return false;
    }
    if (parsed.hash) {
      parsed.hash = "";
    }
    const ext = path.extname(parsed.pathname.toLowerCase());
    if (!ext) {
      return true;
    }
    return ext === ".html";
  } catch {
    return false;
  }
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent": USER_AGENT,
      accept: "text/html, text/css, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8",
      referer: START_URL
    }
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }
  return response.text();
}

async function fetchBuffer(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent": USER_AGENT,
      accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
      referer: START_URL
    }
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }
  const contentType = response.headers.get("content-type");
  const arrayBuffer = await response.arrayBuffer();
  return {
    buffer: Buffer.from(arrayBuffer),
    contentType
  };
}

async function collectImageUrls() {
  const discovered = new Set();
  const cssUrls = new Set();
  const pagesToVisit = [START_URL];
  const visitedPages = new Set();

  const addUrl = (candidate, base) => {
    const absolute = toAbsoluteUrl(candidate, base);
    if (!absolute) {
      return;
    }
    if (isDownloadableImage(absolute)) {
      discovered.add(absolute);
    }
  };

  const rawImageRegex =
    /https?:\/\/[^"'`)\s]+?\.(?:jpg|jpeg|png|webp|gif|svg|avif)(?:\?[^"'`\s)]*)?/gi;

  while (pagesToVisit.length > 0 && visitedPages.size < MAX_PAGES) {
    const pageUrl = pagesToVisit.shift();
    if (!pageUrl || visitedPages.has(pageUrl)) {
      continue;
    }

    try {
      const html = await fetchText(pageUrl);
      const $ = load(html);
      visitedPages.add(pageUrl);

      $("img").each((_, element) => {
        addUrl($(element).attr("src"), pageUrl);
        addUrl($(element).attr("data-src"), pageUrl);
        const srcset = $(element).attr("srcset");
        if (srcset) {
          extractSrcsetUrls(srcset).forEach((item) => addUrl(item, pageUrl));
        }
      });

      $("source").each((_, element) => {
        const srcset = $(element).attr("srcset");
        if (srcset) {
          extractSrcsetUrls(srcset).forEach((item) => addUrl(item, pageUrl));
        }
        addUrl($(element).attr("src"), pageUrl);
      });

      $("video").each((_, element) => {
        addUrl($(element).attr("poster"), pageUrl);
      });

      $("meta[property='og:image'], meta[name='twitter:image']").each((_, element) => {
        addUrl($(element).attr("content"), pageUrl);
      });

      $("*[style]").each((_, element) => {
        const styleValue = $(element).attr("style") || "";
        extractCssUrls(styleValue).forEach((item) => addUrl(item, pageUrl));
      });

      $("link[rel='stylesheet']").each((_, element) => {
        const href = toAbsoluteUrl($(element).attr("href"), pageUrl);
        if (href) {
          cssUrls.add(href);
        }
      });

      $("a[href]").each((_, element) => {
        const href = toAbsoluteUrl($(element).attr("href"), pageUrl);
        if (href && isCrawlablePage(href) && !visitedPages.has(href)) {
          pagesToVisit.push(href);
        }
      });

      (html.match(rawImageRegex) || []).forEach((candidate) => addUrl(candidate, pageUrl));
      console.log(`Scanned page ${visitedPages.size}: ${pageUrl}`);
    } catch (error) {
      console.warn(`Skipping page ${pageUrl}: ${error.message}`);
    }
  }

  for (const cssUrl of Array.from(cssUrls).slice(0, 60)) {
    try {
      const css = await fetchText(cssUrl);
      extractCssUrls(css).forEach((item) => addUrl(item, cssUrl));
      (css.match(rawImageRegex) || []).forEach((candidate) => addUrl(candidate, cssUrl));
    } catch (error) {
      console.warn(`Skipping CSS ${cssUrl}: ${error.message}`);
    }
  }

  return Array.from(discovered);
}

function createFileName(urlValue, index, contentType) {
  const parsed = new URL(urlValue);
  const originalBase = path.basename(parsed.pathname, path.extname(parsed.pathname));
  const sanitizedBase = originalBase
    .replace(/[^a-zA-Z0-9-_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  const fallbackBase = sanitizedBase || `asset-${index + 1}`;
  const hash = crypto.createHash("md5").update(urlValue).digest("hex").slice(0, 8);
  let ext = path.extname(parsed.pathname).toLowerCase();
  if (!IMAGE_EXTENSIONS.has(ext)) {
    ext = extFromContentType(contentType) || ".img";
  }
  return `${String(index + 1).padStart(3, "0")}-${fallbackBase}-${hash}${ext}`;
}

async function prepareOutputDir() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  const existing = await fs.readdir(OUTPUT_DIR);
  await Promise.all(
    existing
      .filter((item) => !item.startsWith("."))
      .map((item) => fs.unlink(path.join(OUTPUT_DIR, item)))
  );
}

async function run() {
  console.log(`Collecting image URLs from ${START_URL}...`);
  const urls = await collectImageUrls();
  console.log(`Discovered ${urls.length} candidate image URLs.`);

  await prepareOutputDir();

  const downloaded = [];
  const skipped = [];

  for (let index = 0; index < urls.length; index += 1) {
    const urlValue = urls[index];
    try {
      const { buffer, contentType } = await fetchBuffer(urlValue);
      const fileName = createFileName(urlValue, index, contentType);
      const absolutePath = path.join(OUTPUT_DIR, fileName);
      await fs.writeFile(absolutePath, buffer);
      downloaded.push({
        source: urlValue,
        localPath: `/assets/ochi/${fileName}`,
        bytes: buffer.length
      });
      console.log(`Saved ${fileName}`);
    } catch (error) {
      skipped.push({ source: urlValue, reason: error.message });
      console.warn(`Failed ${urlValue}: ${error.message}`);
    }
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    source: START_URL,
    totalFound: urls.length,
    totalDownloaded: downloaded.length,
    images: downloaded,
    skipped
  };

  await fs.writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  console.log(`Wrote manifest: ${MANIFEST_PATH}`);
  console.log(
    `Done. Downloaded ${downloaded.length} assets to ${path.relative(process.cwd(), OUTPUT_DIR)}`
  );
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
