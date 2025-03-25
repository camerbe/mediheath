<?php

namespace App\Repositories;

use App\Models\Team;

class TeamRepository extends Repository
{
    public function __construct(Team $team)
    {
        parent::__construct($team);
    }

    public function all()
    {
        return parent::all();
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
