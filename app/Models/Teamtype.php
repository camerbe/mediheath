<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Teamtype extends Model
{
    use HasUuids;
    //
    /**

     * The primary key associated with the table.

     *

     * @var string

     */
    protected $primaryKey = 'id';
    protected $fillable = [
        'name',

    ];
    public function teams():HasMany{
        return $this->hasMany(Team::class);
    }
}
