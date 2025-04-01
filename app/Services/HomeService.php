<?php

namespace App\Services;

use App\Helpers\ImageHelper;
use App\Models\Home;
use App\Repositories\IRepository;

class HomeService
{

    public function __construct(protected IRepository $homeRepository)
    {
    }

    public function create(array $data):Home {
        return $this->homeRepository->create($data);
    }
    public function update(array $data,string $id)
    {
        return $this->homeRepository->update($id,$data);
    }
    public function delete(string $id)
    {
        return $this->homeRepository->delete($id);
    }
    public function find(string $id):Home
    {
        return $this->homeRepository->find($id);
    }
    public function all(){
        return $this->homeRepository->all(['created_at'=>'desc']);
    }
    public function getHomeById(string $id){
        return $this->homeRepository->find($id);
    }

}
