<?php

namespace App\Http\Controllers\api;

use App\Helpers\ImageHelper;
use App\Http\Controllers\Controller;
use App\Models\MedicalTeam;
use App\Services\MedicalTeamService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class MedicalTeamController extends Controller
{
    protected MedicalTeamService $medicalTeamService;
    protected $lastMedicalTeam;

    /**
     * @param MedicalTeamService $medicalTeamService
     */
    public function __construct(MedicalTeamService $medicalTeamService)
    {
        $this->medicalTeamService = $medicalTeamService;
        $this->lastMedicalTeam=MedicalTeam::last();
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $medicalTeams = $this->medicalTeamService->all();
        if ($medicalTeams){
            return response()->json([
                'success'=>true,
                'data'=>$medicalTeams,
                'message'=>"Liste des MedicalTeam"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de MedicalTeam trouvé"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $medicalTeam=$this->medicalTeamService->create($request->all());
        if ($medicalTeam){
            $filteredPhotos = array_filter($request->all(), function ($value, $key) {
                return Str::contains($key, 'image_doctor_');
            }, ARRAY_FILTER_USE_BOTH);

            foreach ($filteredPhotos as $key=>$value ){
                $arr=ImageHelper::decodeBase64Image($value);
                $medicalTeam->addMediaFromBase64($arr['base64Image'])
                    ->usingFileName($arr['filename'])
                    ->toMediaCollection('medical');

            }

            return response()->json([
                'success'=>true,
                'data'=>$medicalTeam,
                'message'=>"MedicalTeam inséré"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Erreur lors de l'insertion de MedicalTeam"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $medicalTeam=$this->medicalTeamService->find($id);
        if ($medicalTeam){
            return response()->json([
                'success'=>true,
                'data'=>$medicalTeam,
                'message'=>"MedicalTeam trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"MedicalTeam non trouvé"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $medicalTeam=$this->medicalTeamService->update($request->all(),$id);
        if ($medicalTeam){
            return response()->json([
                'success'=>true,
                'data'=>$medicalTeam,
                'message'=>"MedicalTeam mis à jour"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Erreur lors de la mise à jour du MedicalTeam"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $medicalTeam=$this->medicalTeamService->delete($id);
        if ($medicalTeam){
            return response()->json([
                'success'=>true,
                'data'=>$medicalTeam,
                'message'=>"MedicalTeam supprimé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Erreur lors de la suppression du MedicalTeam"
        ],Response::HTTP_NOT_FOUND);
    }
    public function getOneMedicalTeam(){
        $medicalTeam=$this->medicalTeamService->find($this->lastMedicalTeam->id);
        if ($medicalTeam){
            return response()->json([
                'success'=>true,
                'data'=>$medicalTeam,
                'photo'=>$medicalTeam->getFirstMediaUrl('medical'),
                'message'=>"FrontEnd MedicalTeam trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"FrontEnd MedicalTeam inexistant"
        ],Response::HTTP_NOT_FOUND);
    }
}
