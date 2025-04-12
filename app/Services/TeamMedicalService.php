<?php

namespace App\Services;

use App\Models\Medicalteam;
use App\Repositories\IRepository;
use Illuminate\Support\Str;

/**
 *
 */
class TeamMedicalService
{

    /**
     * @param IRepository $teamMedical
     */
    public function __construct(protected IRepository $teamMedical)
    {
    }

    /**
     * @param array $data
     * @return Medicalteam
     */
    public function create(array $data):Medicalteam
    {
        $data["titre"]=Str::title($data["titre"]);
        return $this->teamMedical->create($data);
    }

    /**
     * @param array $data
     * @param string $id
     * @return mixed
     */
    public function update(array $data, string $id)
    {
        $data["titre"]=Str::title($data["titre"]);
        return $this->teamMedical->update($id,$data);
    }

    /**
     * @param string $id
     * @return mixed
     */
    public function delete(string $id)
    {
        return $this->teamMedical->delete($id);
    }

    /**
     * @param string $id
     * @return Medicalteam
     */
    public function find(string $id):Medicalteam
    {
        return $this->teamMedical->find($id);
    }

    /**
     * @return mixed
     */
    public function all(){
        return $this->teamMedical->all(['created_at'=>'asc']);
    }

}
