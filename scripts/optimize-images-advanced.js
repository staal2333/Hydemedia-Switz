const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGE_DIR = path.join(__dirname, '..', 'public', 'images');
const QUALITY_JPG = 80;
const QUALITY_PNG = 85;
const QUALITY_WEBP = 85;

let totalOriginalSize = 0;
let totalOptimizedSize = 0;
let filesProcessed = 0;
let filesSkipped = 0;

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const fileName = path.basename(filePath);
  
  // Skip if already optimized or special files
  if (fileName.includes('.optimized') || 
      fileName.includes('placeholder') ||
      ext === '.avif' || 
      ext === '.webp' ||
      ext === '.svg') {
    filesSkipped++;
    return;
  }

  try {
    const stats = fs.statSync(filePath);
    const originalSize = stats.size;
    totalOriginalSize += originalSize;

    console.log(`\n📸 Processing: ${fileName} (${(originalSize / 1024).toFixed(2)} KB)`);

    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    // Calculate new dimensions (max 2000px width, maintain aspect ratio)
    const maxWidth = 2000;
    const maxHeight = 2000;
    let newWidth = metadata.width;
    let newHeight = metadata.height;
    
    if (newWidth > maxWidth || newHeight > maxHeight) {
      const ratio = Math.min(maxWidth / newWidth, maxHeight / newHeight);
      newWidth = Math.round(newWidth * ratio);
      newHeight = Math.round(newHeight * ratio);
      console.log(`  📐 Resizing: ${metadata.width}x${metadata.height} → ${newWidth}x${newHeight}`);
    }

    if (ext === '.jpg' || ext === '.jpeg') {
      // Optimize JPG
      const outputPath = filePath;
      await sharp(filePath)
        .resize(newWidth, newHeight, { fit: 'inside' })
        .jpeg({ quality: QUALITY_JPG, progressive: true, mozjpeg: true })
        .toFile(outputPath + '.tmp');
      
      fs.renameSync(outputPath + '.tmp', outputPath);
      
      const newStats = fs.statSync(outputPath);
      const newSize = newStats.size;
      totalOptimizedSize += newSize;
      
      const savings = ((1 - newSize / originalSize) * 100).toFixed(1);
      console.log(`  ✅ JPG optimized: ${(newSize / 1024).toFixed(2)} KB (${savings}% smaller)`);
      
      // Also create WebP version
      const webpPath = outputPath.replace(/\.(jpg|jpeg)$/i, '.webp');
      if (!fs.existsSync(webpPath)) {
        await sharp(filePath)
          .resize(newWidth, newHeight, { fit: 'inside' })
          .webp({ quality: QUALITY_WEBP })
          .toFile(webpPath);
        
        const webpStats = fs.statSync(webpPath);
        const webpSavings = ((1 - webpStats.size / originalSize) * 100).toFixed(1);
        console.log(`  🎨 WebP created: ${(webpStats.size / 1024).toFixed(2)} KB (${webpSavings}% smaller than original)`);
      }
    } else if (ext === '.png') {
      // Convert PNG to WebP (usually much smaller)
      const webpPath = filePath.replace('.png', '.webp');
      
      await sharp(filePath)
        .resize(newWidth, newHeight, { fit: 'inside' })
        .webp({ quality: QUALITY_PNG })
        .toFile(webpPath);
      
      const webpStats = fs.statSync(webpPath);
      totalOptimizedSize += webpStats.size;
      
      const savings = ((1 - webpStats.size / originalSize) * 100).toFixed(1);
      console.log(`  ✅ PNG → WebP: ${(webpStats.size / 1024).toFixed(2)} KB (${savings}% smaller)`);
      
      // Optionally delete original PNG to save space
      // fs.unlinkSync(filePath);
      // console.log(`  🗑️ Original PNG deleted`);
    }

    filesProcessed++;
  } catch (error) {
    console.error(`  ❌ Error processing ${fileName}:`, error.message);
  }
}

async function walkDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      await walkDirectory(filePath);
    } else if (stat.isFile()) {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        await optimizeImage(filePath);
      }
    }
  }
}

async function main() {
  console.log('🚀 Starting Advanced Image Optimization...\n');
  console.log(`📁 Directory: ${IMAGE_DIR}\n`);
  
  const startTime = Date.now();
  
  await walkDirectory(IMAGE_DIR);
  
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 OPTIMIZATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Files processed: ${filesProcessed}`);
  console.log(`⏭️  Files skipped: ${filesSkipped}`);
  console.log(`📦 Original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📦 Optimized size: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
  
  const savingsMB = (totalOriginalSize - totalOptimizedSize) / 1024 / 1024;
  const savingsPercent = ((1 - totalOptimizedSize / totalOriginalSize) * 100);
  console.log(`💰 Total savings: ${savingsMB.toFixed(2)} MB (${savingsPercent.toFixed(1)}%)`);
  console.log(`⏱️  Time taken: ${duration}s`);
  console.log('='.repeat(60));
}

main().catch(console.error);
