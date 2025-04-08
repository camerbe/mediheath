<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class OtherTeam extends Model implements HasMedia
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
        'meta',

    ];
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('other')
            ->singleFile=false;
        $this->addMediaCollection('other')
            ->registerMediaConversions(function (Media $media) {
                $this
                    ->addMediaConversion('thumb')
                    ->width(100)
                    ->height(100);
            });
        $this->addMediaCollection('other')
            ->withResponsiveImages();
    }
    public static function last(){
        return static::latest()->first();
    }
}
