<?php

namespace App\Repositories;

use App\Models\Pole;

class PoleRepository extends Repository
{
    public function __construct(Pole $pole)
    {
        parent::__construct($pole);
    }

    public function all()
    {
        return parent::all();
    }

    public function find($id)
    {
        return parent::find($id);
    }

    public function create(array $data):Pole
    {
        //dd($data);
        return parent::create($data);
    }

    public function update($id, array $data)
    {
        return parent::update($id, $data);
    }

    public function delete($id)
    {
        return parent::delete($id);
    }

}
