<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Services\CentreService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CentreController extends Controller
{
    protected CentreService $centreService;

    /**
     * @param CentreService $centreService
     */
    public function __construct(CentreService $centreService)
    {
        $this->centreService = $centreService;
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $centres = $this->centreService->all();
        if ($centres){
            return response()->json([
                'success'=>true,
                'data'=>$centres,
                'message'=>"Liste des centres"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de centre trouvé"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        //
        $centre=$this->centreService->create($request->all());
        if ($centre){
            return response()->json([
                'success'=>true,
                'data'=>$centre,
                'message'=>"centre inséré"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Erreur lors de l'insertion de centre"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $centre=$this->centreService->find($id);
        if ($centre){
            return response()->json([
                'success'=>true,
                'data'=>$centre,
                'message'=>"Centre trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Centre non trouvé"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $centre=$this->centreService->update($request->all(),$id);
        if ($centre){
            return response()->json([
                'success'=>true,
                'data'=>$centre,
                'message'=>"Centre mis à jour"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Erreur lors de la mise à jour du centre"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $centre=$this->centreService->delete($id);
        if ($centre){
            return response()->json([
                'success'=>true,
                'data'=>$centre,
                'message'=>"Centre supprimé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Erreur lors de la suppression du centre"
        ],Response::HTTP_NOT_FOUND);
    }
}
