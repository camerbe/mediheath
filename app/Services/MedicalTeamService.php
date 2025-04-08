<?php

namespace App\Services;

use App\Models\MedicalTeam;
use App\Repositories\IRepository;
use Illuminate\Support\Str;

class MedicalTeamService
{

    public function __construct(protected IRepository $medicalTeamRepository)
    {
    }
    public function create(array $data):MedicalTeam {
        $data["titre"]=Str::title($data["titre"]);
        return $this->medicalTeamRepository->create($data);
    }
    public function update(array $data,string $id)
    {
        $data["titre"]=Str::title($data["titre"]);
        return $this->medicalTeamRepository->update($id,$data);
    }
    public function delete(string $id)
    {
        return $this->medicalTeamRepository->delete($id);
    }
    public function find(string $id):MedicalTeam
    {
        return $this->medicalTeamRepository->find($id);
    }
    public function all(){
        return $this->medicalTeamRepository->all(['name'=>'asc']);
    }
}
