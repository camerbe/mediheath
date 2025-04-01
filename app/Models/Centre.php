<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use League\CommonMark\Extension\Attributes\Node\Attributes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Centre extends Model implements HasMedia
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
        'description',
        'photo_1',
        'photo_2',
        'photo_3',
        'photo_4',
        'photo_5',
        'meta',
    ];
    protected $casts = ['image' => 'array', ];
    protected  function image():Attribute{
        return Attribute::make(
            get:fn($value)=>json_decode($value,true),
            set:fn($value)=>json_encode($value),
        );
    }
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('centre')
            ->singleFile=false;
        $this->addMediaCollection('centre')
            ->registerMediaConversions(function (Media $media) {
                $this
                    ->addMediaConversion('thumb')
                    ->width(100)
                    ->height(100);
            });
        $this->addMediaCollection('centre')
            ->withResponsiveImages();
    }
    public static function last(){
       // return static::all()->last();
        return static::latest()->first();
    }
}
