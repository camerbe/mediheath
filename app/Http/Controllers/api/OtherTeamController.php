<?php

namespace App\Http\Controllers\api;

use App\Helpers\ImageHelper;
use App\Http\Controllers\Controller;
use App\Models\OtherTeam;
use App\Services\OtherTeamService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class OtherTeamController extends Controller
{
    protected OtherTeamService $otherTeamService;
    protected $lastOtherTeam;

    /**
     * @param OtherTeamService $otherTeamService
     */
    public function __construct(OtherTeamService $otherTeamService)
    {
        $this->otherTeamService = $otherTeamService;
        $this->lastOtherTeam=OtherTeam::last();
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $otherTeams = $this->otherTeamService->all();
        if ($otherTeams){
            return response()->json([
                'success'=>true,
                'data'=>$otherTeams,
                'message'=>"Liste des OtherTeam"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de OtherTeam trouvé"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $otherTeam=$this->otherTeamService->create($request->all());
        if ($otherTeam){
            $filteredPhotos = array_filter($request->all(), function ($value, $key) {
                return Str::contains($key, 'image_doctor_');
            }, ARRAY_FILTER_USE_BOTH);

            foreach ($filteredPhotos as $key=>$value ){
                $arr=ImageHelper::decodeBase64Image($value);
                $otherTeam->addMediaFromBase64($arr['base64Image'])
                    ->usingFileName($arr['filename'])
                    ->toMediaCollection('other');

            }

            return response()->json([
                'success'=>true,
                'data'=>$otherTeam,
                'message'=>"OtherTeam inséré"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Erreur lors de l'insertion de OtherTeam"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $otherTeam=$this->otherTeamService->find($id);
        if ($otherTeam){
            return response()->json([
                'success'=>true,
                'data'=>$otherTeam,
                'message'=>"OtherTeam trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"OtherTeam non trouvé"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $otherTeam=$this->otherTeamService->update($request->all(),$id);
        if ($otherTeam){
            return response()->json([
                'success'=>true,
                'data'=>$otherTeam,
                'message'=>"OtherTeam mis à jour"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Erreur lors de la mise à jour du OtherTeam"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $otherTeam=$this->otherTeamService->delete($id);
        if ($otherTeam){
            return response()->json([
                'success'=>true,
                'data'=>$otherTeam,
                'message'=>"OtherTeam supprimé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Erreur lors de la suppression du OtherTeam"
        ],Response::HTTP_NOT_FOUND);
    }
    public function getOneOtherTeam(){
        $otherTeam=$this->otherTeamService->find($this->lastOtherTeam->id);
        if ($otherTeam){
            return response()->json([
                'success'=>true,
                'data'=>$otherTeam,
                'photo'=>$otherTeam->getFirstMediaUrl('other'),
                'message'=>"FrontEnd OtherTeam trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"FrontEnd OtherTeam inexistant"
        ],Response::HTTP_NOT_FOUND);
    }
}
