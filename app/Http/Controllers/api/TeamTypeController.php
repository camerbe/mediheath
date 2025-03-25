<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Services\TeamTypeService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TeamTypeController extends Controller
{
    protected TeamTypeService $teamTypeService;

    /**
     * @param TeamTypeService $teamTypeService
     */
    public function __construct(TeamTypeService $teamTypeService)
    {
        $this->teamTypeService = $teamTypeService;
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $teamtypes = $this->teamTypeService->all();
        if ($teamtypes){
            return response()->json([
                'success'=>true,
                'data'=>$teamtypes,
                'message'=>"Liste des teamtypes"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de teamtype trouvé"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $teamtype=$this->teamTypeService->create($request->all());
        if ($teamtype){
            return response()->json([
                'success'=>true,
                'data'=>$teamtype,
                'message'=>"Teamtypes inséré"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Erreur lors de l'insertion de teamtypes"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $teamtype=$this->teamTypeService->find($id);
        if ($teamtype){
            return response()->json([
                'success'=>true,
                'data'=>$teamtype,
                'message'=>"Teamtypes trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Teamtypes non trouvé"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $teamtype=$this->teamTypeService->update($request->all(),$id);
        if ($teamtype){
            return response()->json([
                'success'=>true,
                'data'=>$teamtype,
                'message'=>"Teamtypes mis à jour"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Erreur lors de la mise à jour du teamtypes"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $teamtype=$this->teamTypeService->delete($id);
        if ($teamtype){
            return response()->json([
                'success'=>true,
                'data'=>$teamtype,
                'message'=>"Teamtypes supprimé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Erreur lors de la suppression du teamtypes"
        ],Response::HTTP_NOT_FOUND);
    }
}
