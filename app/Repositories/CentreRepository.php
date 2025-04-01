<?php

namespace App\Repositories;

use App\Models\Centre;

class CentreRepository extends Repository
{
    public function __construct(Centre $centre)
    {
        parent::__construct($centre);
    }

    public function all($orderBy = ['created_at' => 'desc'])
    {
        return parent::all($orderBy);
    }

    public function find($id)
    {
        return parent::find($id);
    }

    public function create(array $data):Centre
    {
        $data['meta']=json_encode($data['meta']);
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
