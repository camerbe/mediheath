<?php

namespace App\Services;

use App\Models\Pole;
use App\Repositories\IRepository;


class PoleService
{

    public function __construct(protected IRepository $poleRepository)
    {
    }

    public function create(array $data):Pole {
        return $this->poleRepository->create($data);
    }
    public function update(array $data,string $id)
    {
        return $this->poleRepository->update($id,$data);
    }
    public function delete(string $id)
    {
        return $this->poleRepository->delete($id);
    }
    public function find(string $id):Pole
    {
        return $this->poleRepository->find($id);
    }
    public function all(){
        return $this->poleRepository->all(['created_at'=>'desc']);
    }
}
