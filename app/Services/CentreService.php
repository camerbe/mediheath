<?php

namespace App\Services;

use App\Models\Centre;
use App\Repositories\IRepository;

class CentreService
{
    public function __construct(protected IRepository $centreRepository)
    {
    }

    public function create(array $data):Centre {

        //dd($data);
        //dd(json_decode($data,true));
        return $this->centreRepository->create($data);
    }
    public function update(array $data,string $id)
    {
        return $this->centreRepository->update($id,$data);
    }
    public function delete(string $id)
    {
        return $this->centreRepository->delete($id);
    }
    public function find(string $id):Centre
    {
        return $this->centreRepository->find($id);
    }
    public function all(){
        return $this->centreRepository->all();
    }
}
