<?php

namespace App\Helpers;

class ImageHelper
{
    /**
     * Extracts the src value from an img tag in the given HTML string.
     *
     * @param string $html The HTML content containing the <img> tag
     * @return string|null The src value or null if not found
     */
    public static function extractImgSrc($html){
        preg_match('/<img[^>]+src=["\'](.*?)["\']/', $html, $matches);
        return isset($matches[1]) ? $matches[1] : null;
    }
    public static function decodeBase64Image($html): array
    {
        $imageBase64 = ImageHelper::extractImgSrc($html);

        if (!preg_match('/^data:image\/(\w+);base64,/', $imageBase64, $type)) {
            throw new \InvalidArgumentException('Invalid image format: ' . $imageBase64);
        }

        // ✅ Use $imageBase64, not $html
        $imageData = substr($imageBase64, strpos($imageBase64, ',') + 1);
        $imageData = base64_decode($imageData);

        if ($imageData === false) {
            throw new \RuntimeException('Base64 decoding failed');
        }

        $extension = strtolower($type[1]); // jpg, png, webp...
        $fileName  = 'image_' . time() . '.' . $extension;

        return [
            'filename'    => $fileName,
            'base64Image' => $imageBase64,
        ];
    }





}
