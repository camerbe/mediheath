<?php

namespace App\Http\Controllers\api;

use App\Helpers\ImageHelper;
use App\Http\Controllers\Controller;
use App\Models\Pole;
use App\Services\PoleService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PoleController extends Controller
{
    protected PoleService $poleService;
    protected $lastPole;
    /**
     * @param PoleService $poleService
     */
    public function __construct(PoleService $poleService)
    {
        $this->poleService = $poleService;
        $this->lastPole=Pole::last();
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
            $arr=ImageHelper::decodeBase64Image($request->input('image'));
            $pole->addMediaFromBase64($arr['base64Image'])
                ->usingFileName($arr['filename'])
                ->toMediaCollection('pole');
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
    public function getOnePole(){
        $pole=$this->poleService->find($this->lastPole->id);
        if ($pole){
            return response()->json([
                'success'=>true,
                'data'=>$pole,
                'photo'=>$pole->getFirstMediaUrl('pole'),
                'message'=>"FrontEnd Pôle trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"FrontEnd Pôle inexistant"
        ],Response::HTTP_NOT_FOUND);
    }
}
