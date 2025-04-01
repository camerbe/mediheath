<?php

namespace App\Services;

use App\Models\Teamtype;
use App\Repositories\IRepository;
use Illuminate\Support\Str;

class TeamTypeService
{

    public function __construct(protected IRepository $teamtypeRepository)
    {
    }
    public function create(array $data):Teamtype {
        $data["name"]=Str::title($data["name"]);
        return $this->teamtypeRepository->create($data);
    }
    public function update(array $data,string $id)
    {
        $data["name"]=Str::title($data["name"]);
        return $this->teamtypeRepository->update($id,$data);
    }
    public function delete(string $id)
    {
        return $this->teamtypeRepository->delete($id);
    }
    public function find(string $id):Teamtype
    {
        return $this->teamtypeRepository->find($id);
    }
    public function all(){
        return $this->teamtypeRepository->all(['name'=>'asc']);
    }
}
