<?php

namespace App\Services;

use App\Models\Team;
use App\Repositories\IRepository;
use Illuminate\Support\Str;

class TeamService
{

    public function __construct(protected IRepository $teamRepository)
    {
    }

    public function create(array $data):Team {

        return $this->teamRepository->create($data);
    }
    public function update(array $data,string $id)
    {
        return $this->teamRepository->update($id,$data);
    }
    public function delete(string $id)
    {
        return $this->teamRepository->delete($id);
    }
    public function find(string $id):Team
    {
        return $this->teamRepository->find($id);
    }
    public function all(){
        return $this->teamRepository->all();
    }
}
