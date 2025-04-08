<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Pole extends Model implements HasMedia
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
        'image',
        'description',
        'meta',


    ];
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('pole')
            ->singleFile=false;
        $this->addMediaCollection('pole')
            ->registerMediaConversions(function (Media $media) {
                $this
                    ->addMediaConversion('thumb')
                    ->width(100)
                    ->height(100);
            });
        $this->addMediaCollection('pole')
            ->withResponsiveImages();
    }
    public static function last(){
        return static::latest()->first();
    }
}
