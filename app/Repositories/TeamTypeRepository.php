<?php

namespace App\Repositories;

use App\Models\Teamtype;

class TeamTypeRepository extends Repository
{
    public function __construct(Teamtype $teamType)
    {
        parent::__construct($teamType);
    }

    /*public function all()
    {
        return parent::all();
    }*/
    public function all($orderBy = ['name' => 'asc'])
    {
        return parent::all($orderBy);
    }

    public function find($id)
    {
        return parent::find($id);
    }

    public function create(array $data)
    {
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
