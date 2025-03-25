<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Home extends Model implements HasMedia
{
    use HasUuids,InteractsWithMedia;
    //
    /**

     * The primary key associated with the table.

     *

     * @var string

     */
    protected $primaryKey = 'id';

    protected $fillable = [
        'location',
        'open_hour',
        'doctor_image',
        'doctor_description',

    ];
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('home')
            ->singleFile=false;
        $this->addMediaCollection('home')
            ->registerMediaConversions(function (Media $media) {
                $this
                    ->addMediaConversion('thumb')
                    ->width(100)
                    ->height(100);
            });
        $this->addMediaCollection('home')
            ->withResponsiveImages();
    }
    public static function last(){
        return static::latest()->first();
    }
}
