<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Team extends Model implements HasMedia
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
        'staff',
        'teamtype_id',

    ];
    public function teamtype():BelongsTo{
        return $this->belongsTo(Teamtype::class);
    }
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('team')
            ->singleFile=false;
        $this->addMediaCollection('team')
            ->registerMediaConversions(function (Media $media) {
                $this
                    ->addMediaConversion('thumb')
                    ->width(100)
                    ->height(100);
            });
        $this->addMediaCollection('team')
            ->withResponsiveImages();
    }
    public static function last(){
        return static::latest()->first();
    }
}
