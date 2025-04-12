<?php

namespace App\Http\Controllers\api;

use App\Helpers\ImageHelper;
use App\Http\Controllers\Controller;
use App\Models\Medicalteam;
use App\Services\MedicalTeamService;
use App\Services\TeamMedicalService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class MedicalTeamController extends Controller
{
    protected TeamMedicalService $teamMedicalService;
    protected $lastTeamMedical;


    /**
     * @param TeamMedicalService $teamMedicalService
     */
    public function __construct(TeamMedicalService $teamMedicalService)
    {
        $this->teamMedicalService = $teamMedicalService;
        $this->lastTeamMedical=Medicalteam::last();
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $Medicalteams = $this->teamMedicalService->all();
        if ($Medicalteams){
            return response()->json([
                'success'=>true,
                'data'=>$Medicalteams,
                'message'=>"Liste des Medicalteam"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de Medicalteam trouvé"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $Medicalteam=$this->teamMedicalService->create($request->all());
        if ($Medicalteam){
            $filteredPhotos = array_filter($request->all(), function ($value, $key) {
                return Str::contains($key, 'image_doctor_');
            }, ARRAY_FILTER_USE_BOTH);

            foreach ($filteredPhotos as $key=>$value ){
                $arr=ImageHelper::decodeBase64Image($value);
                $Medicalteam->addMediaFromBase64($arr['base64Image'])
                    ->usingFileName($arr['filename'])
                    ->toMediaCollection('medical');

            }

            return response()->json([
                'success'=>true,
                'data'=>$Medicalteam,
                'message'=>"Medicalteam inséré"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Erreur lors de l'insertion de Medicalteam"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $Medicalteam=$this->teamMedicalService->find($id);
        if ($Medicalteam){
            return response()->json([
                'success'=>true,
                'data'=>$Medicalteam,
                'message'=>"Medicalteam trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Medicalteam non trouvé"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $Medicalteam=$this->teamMedicalService->update($request->all(),$id);
        if ($Medicalteam){
            $Medicalteam->clearMediaCollection('medical');
            $filteredPhotos = array_filter($request->all(), function ($value, $key) {
                return Str::contains($key, 'image_doctor_');
            }, ARRAY_FILTER_USE_BOTH);

            foreach ($filteredPhotos as $key=>$value ){
                $arr=ImageHelper::decodeBase64Image($value);
                $Medicalteam->addMediaFromBase64($arr['base64Image'])
                    ->usingFileName($arr['filename'])
                    ->toMediaCollection('medical');

            }
            return response()->json([
                'success'=>true,
                'data'=>$Medicalteam,
                'message'=>"Medicalteam mis à jour"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Erreur lors de la mise à jour du Medicalteam"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $Medicalteam=$this->teamMedicalService->delete($id);
        if ($Medicalteam){
            return response()->json([
                'success'=>true,
                'data'=>$Medicalteam,
                'message'=>"Medicalteam supprimé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Erreur lors de la suppression du Medicalteam"
        ],Response::HTTP_NOT_FOUND);
    }
    public function getOneMedicalteam(){
        $Medicalteam=$this->teamMedicalService->find($this->lastTeamMedical->id);
        if ($Medicalteam){
            return response()->json([
                'success'=>true,
                'data'=>$Medicalteam,
                'photo'=>$Medicalteam->getFirstMediaUrl('medical'),
                'message'=>"FrontEnd Medicalteam trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"FrontEnd Medicalteam inexistant"
        ],Response::HTTP_NOT_FOUND);
    }
}
