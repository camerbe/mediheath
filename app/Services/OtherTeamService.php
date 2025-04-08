<?php

namespace App\Services;

use App\Models\OtherTeam;
use App\Repositories\IRepository;
use Illuminate\Support\Str;

class OtherTeamService
{

    public function __construct(protected IRepository $otherTeam)
    {
    }

    public function create(array $data):OtherTeam {
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
    public function find(string $id):OtherTeam
    {
        return $this->otherTeam->find($id);
    }
    public function all(){
        return $this->otherTeam->all(['name'=>'asc']);
    }
}
