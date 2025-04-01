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
    public static function decodeBase64Image($html){
        $imageBase64=ImageHelper::extractImgSrc($html);
        //dd($imageBase64);
        if (!preg_match('/^data:image\/(\w+);base64,/', $imageBase64, $type)) {
            return 'Invalid image format';
        }
        $imageData = substr($html, strpos($imageBase64, ',') + 1);
        $imageData = base64_decode($imageData);
        if ($imageData === false) {
            return 'Base64 decoding failed';
        }
        $extension = $type[1]; // Get extension (e.g., jpg, png)
        $fileName = 'image_' . time() . '.' . $extension;
        return ['filename'=>$fileName,'base64Image'=>$imageBase64];
    }
}
