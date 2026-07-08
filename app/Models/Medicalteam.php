<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Medicalteam extends Model implements HasMedia
{
    //
    use HasUuids,InteractsWithMedia;
    protected $primaryKey = 'id';
    protected $fillable = [
        'titre',
        'doctor_1',
        'image_doctor_1',
        'doctor_2',
        'image_doctor_2',
        'doctor_3',
        'image_doctor_3',
        'doctor_4',
        'image_doctor_4',
        'doctor_5',
        'image_doctor_5',
        'meta',

    ];
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('medical')
            ->singleFile=false;
        $this->addMediaCollection('medical')
            ->registerMediaConversions(function (Media $media) {
                $this
                    ->addMediaConversion('thumb')
                    ->width(100)
                    ->height(100);
            });
        $this->addMediaCollection('medical')
            ->withResponsiveImages();
    }
    public static function last(){
        return static::latest()->first();
    }
    public function getImagesAttribute()
    {
        return $this->getMedia('medical')->map(function ($media) {
            return [
                'original' => $media->getUrl(),
                'thumb' => $media->getUrl('thumb'), // Conversion
                'properties' => $media->custom_properties,
                'width' => $media->getCustomProperty('width'),
            ];
        });
    }
}
