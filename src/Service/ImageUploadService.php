<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\JsonResponse;

class ImageUploadService
{
    public function upload($image)
    {
        $uploads_dir = realpath(__DIR__ . '/../../public/assets/uploads');
        if ($image["name"] != "") {
            $tmp_name = $image["tmp_name"];
            $filename = $image["name"] . "." . "webp";
            while (file_exists("$uploads_dir/" . $filename)) {
                $filename = $image["name"] . strval(rand(0, 999999)) . "." . "webp";
            }
            $isUploaded = move_uploaded_file($tmp_name, "$uploads_dir/" . $filename);
            if ($isUploaded) {
                return [
                    'code' => 1,
                    'src' => '/assets/uploads/' . $filename,
                ];
            }
        }
        return [
            'code' => 0
        ];
    }
    public function uploadAndReturnName($image)
    {
        $uploads_dir = realpath(__DIR__ . '/../../public/assets/uploads');
        if ($image["name"] != "") {
            $tmp_name = $image["tmp_name"];
            $filename = $image["name"] . "." . "webp";
            while (file_exists("$uploads_dir/" . $filename)) {
                $filename = $image["name"] . strval(rand(0, 999999)) . "." . "webp";
            }
            $isUploaded = move_uploaded_file($tmp_name, "$uploads_dir/" . $filename);
            if ($isUploaded) {
                return [
                    'code' => 1,
                    'filename' => $filename,
                ];
            }
        }
        return [
            'code' => 0
        ];
    }
}