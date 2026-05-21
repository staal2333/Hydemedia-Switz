const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public', 'images');

// Configuration
const CONFIG = {
  jpg: { quality: 80, progressive: true },
  png: { quality: 85, compressionLevel: 9 },
  webp: { quality: 80 },
  avif: { quality: 70 },
};

// Files to skip (already optimized or logos that need transparency)
const SKIP_FILES = [
  'Facade-banner.avif', // Already AVIF
  '.placeholder', // Placeholder files
  'README.md',
  '.optimization-guide.md'
];

async function getAllImages(dir) {
  const files = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      const subFiles = await getAllImages(fullPath);
      files.push(...subFiles);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'].includes(ext)) {
        if (!SKIP_FILES.some(skip => entry.name.includes(skip))) {
          files.push(fullPath);
        }
      }
    }
  }

  return files;
}

async function getFileSize(filePath) {
  const stats = await fs.stat(filePath);
  return stats.size;
}

function formatBytes(bytes) {
  return (bytes / 1024 / 1024).toFixed(2) + ' MB';
}

async function optimizeImage(filePath) {
  const originalSize = await getFileSize(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const fileName = path.basename(filePath);
  
  console.log(`\n📸 Processing: ${fileName}`);
  console.log(`   Original size: ${formatBytes(originalSize)}`);

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Optimize based on file type
    if (ext === '.jpg' || ext === '.jpeg') {
      // Optimize JPG
      await image
        .jpeg(CONFIG.jpg)
        .toFile(filePath + '.tmp');
    } else if (ext === '.png') {
      // Convert PNG to WebP for better compression
      const webpPath = filePath.replace(/\.png$/i, '.webp');
      await image
        .webp(CONFIG.webp)
        .toFile(webpPath);
      
      console.log(`   ✅ Converted to WebP: ${path.basename(webpPath)}`);
      
      // Also keep optimized PNG for fallback
      await image
        .png(CONFIG.png)
        .toFile(filePath + '.tmp');
    }

    // Replace original with optimized
    if (await fs.access(filePath + '.tmp').then(() => true).catch(() => false)) {
      const optimizedSize = await getFileSize(filePath + '.tmp');
      const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);

      await fs.rename(filePath + '.tmp', filePath);
      
      console.log(`   ✅ Optimized size: ${formatBytes(optimizedSize)} (${savings}% reduction)`);
      
      return {
        file: fileName,
        originalSize,
        optimizedSize,
        savings: originalSize - optimizedSize
      };
    }

  } catch (error) {
    console.error(`   ❌ Error optimizing ${fileName}:`, error.message);
    // Clean up tmp file if it exists
    try {
      await fs.unlink(filePath + '.tmp');
    } catch (e) {}
    return null;
  }
}

async function fixFileExtensions() {
  console.log('\n🔧 Fixing file extensions...\n');
  
  // Fix double extensions like .jpg.JPG
  const casesDir = path.join(PUBLIC_DIR, 'cases');
  const files = await fs.readdir(casesDir);
  
  for (const file of files) {
    if (file.includes('.jpg.JPG')) {
      const oldPath = path.join(casesDir, file);
      const newPath = path.join(casesDir, file.replace('.jpg.JPG', '.jpg'));
      await fs.rename(oldPath, newPath);
      console.log(`✅ Renamed: ${file} → ${path.basename(newPath)}`);
    } else if (file.endsWith('.JPG')) {
      const oldPath = path.join(casesDir, file);
      const newPath = path.join(casesDir, file.replace('.JPG', '.jpg'));
      await fs.rename(oldPath, newPath);
      console.log(`✅ Renamed: ${file} → ${path.basename(newPath)}`);
    }
  }
}

async function main() {
  console.log('🚀 Starting Image Optimization\n');
  console.log('================================================\n');

  // Fix file extensions first
  await fixFileExtensions();

  // Get all images
  const images = await getAllImages(PUBLIC_DIR);
  console.log(`\n📊 Found ${images.length} images to optimize\n`);

  // Track progress
  let totalOriginal = 0;
  let totalOptimized = 0;
  let successCount = 0;

  // Optimize each image
  for (const imagePath of images) {
    const result = await optimizeImage(imagePath);
    if (result) {
      totalOriginal += result.originalSize;
      totalOptimized += result.optimizedSize;
      successCount++;
    }
  }

  // Summary
  console.log('\n================================================');
  console.log('✅ OPTIMIZATION COMPLETE\n');
  console.log(`📊 Images processed: ${successCount}/${images.length}`);
  console.log(`📦 Total original size: ${formatBytes(totalOriginal)}`);
  console.log(`📦 Total optimized size: ${formatBytes(totalOptimized)}`);
  console.log(`💾 Total savings: ${formatBytes(totalOriginal - totalOptimized)}`);
  console.log(`📈 Overall reduction: ${((totalOriginal - totalOptimized) / totalOriginal * 100).toFixed(1)}%`);
  console.log('================================================\n');
}

main().catch(console.error);
