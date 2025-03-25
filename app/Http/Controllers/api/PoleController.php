<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Services\PoleService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PoleController extends Controller
{
    protected PoleService $poleService;

    /**
     * @param PoleService $poleService
     */
    public function __construct(PoleService $poleService)
    {
        $this->poleService = $poleService;
    }



    /**
     * @OA\Get(
     *     path="/api/poles",
     *     summary="Récupérer la liste des pôles",
     *     tags={"Poles"},
     *     @OA\Response(
     *         response=200,
     *         description="Liste des poles"
     *     )
     * )
     */
    public function index()
    {
        $poles = $this->poleService->all();
        if ($poles){
            return response()->json([
                'success'=>true,
                'data'=>$poles,
                'message'=>"Liste des poles"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de pole trouvé"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $pole=$this->poleService->create($request->all());
        if ($pole){
            return response()->json([
                'success'=>true,
                'data'=>$pole,
                'message'=>"Pôle inséré"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Erreur lors de l'insertion de pôle"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $pole=$this->poleService->find($id);
        if ($pole){
            return response()->json([
                'success'=>true,
                'data'=>$pole,
                'message'=>"Pôle trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pôle non trouvé"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $pole=$this->poleService->update($request->all(),$id);
        if ($pole){
            return response()->json([
                'success'=>true,
                'data'=>$pole,
                'message'=>"Pôle mis à jour"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Erreur lors de la mise à jour du pôle"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $pole=$this->poleService->delete($id);
        if ($pole){
            return response()->json([
                'success'=>true,
                'data'=>$pole,
                'message'=>"Pôle supprimé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Erreur lors de la suppression du pôle"
        ],Response::HTTP_NOT_FOUND);
    }
}
