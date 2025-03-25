<?php

namespace App\Repositories;

use App\Models\Centre;

class CentreRepository extends Repository
{
    public function __construct(Centre $centre)
    {
        parent::__construct($centre);
    }

    public function all()
    {
        return parent::all();
    }

    public function find($id)
    {
        return parent::find($id);
    }

    public function create(array $data):Centre
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
