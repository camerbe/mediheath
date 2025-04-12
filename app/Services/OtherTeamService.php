<?php

namespace App\Services;

use App\Models\Otherteam;
use App\Repositories\IRepository;
use Illuminate\Support\Str;

class OtherTeamService
{

    public function __construct(protected IRepository $otherTeam)
    {
    }

    public function create(array $data):Otherteam {
        $data["titre"]=Str::title($data["titre"]);
        return $this->otherTeam->create($data);
    }
    public function update(array $data,string $id)
    {
        $data["titre"]=Str::title($data["titre"]);
        return $this->otherTeam->update($id,$data);
    }
    public function delete(string $id)
    {
        return $this->otherTeam->delete($id);
    }
    public function find(string $id):Otherteam
    {
        return $this->otherTeam->find($id);
    }
    public function all(){
        return $this->otherTeam->all(['created_at'=>'asc']);
    }
}
