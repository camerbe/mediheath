<?php

namespace App\Repositories;

use App\Models\Home;

class HomeRepository extends Repository
{
    public function __construct(Home $home)
    {
        parent::__construct($home);
    }

    public function all($orderBy = ['created_at' => 'desc'])
    {
        return parent::all($orderBy );
    }

    public function find($id)
    {
        return parent::find($id); // TODO: Change the autogenerated stub
    }

    public function create(array $data)
    {
        $data['meta']=json_encode($data['meta']);
        return parent::create($data); // TODO: Change the autogenerated stub
    }

    public function update($id, array $data)
    {
        return parent::update($id, $data); // TODO: Change the autogenerated stub
    }

    public function delete($id)
    {
        return parent::delete($id); // TODO: Change the autogenerated stub
    }
    public function getHomeById($id){
        return parent::find($id);
    }

}
