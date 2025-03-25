<?php

namespace App\Repositories;

class Repository implements IRepository
{
    protected $model;

    /**
     * @param $model
     */
    public function __construct($model)
    {
        $this->model = $model;
    }


    public function all()
    {
        return $this->model->all();
    }

    public function find($id)
    {
        return $this->model->findOrfail($id);
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update($id, array $data)
    {
        $model = $this->model->findOrFail($id);
        $model->update($data);
        return $model;
    }

    public function delete($id)
    {
        $model = $this->model->findOrFail($id);
        return $model->delete();
    }
}
