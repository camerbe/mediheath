<?php

namespace App\Http\Controllers\api;

use App\Helpers\ImageHelper;
use App\Http\Controllers\Controller;
use App\Models\Home;
use App\Services\HomeService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class HomeController extends Controller
{
    protected HomeService $homeService;
    protected $lastHome;
    /**
     * @param HomeService $homeService
     */
    public function __construct(HomeService $homeService)
    {
        $this->homeService = $homeService;
        $this->lastHome=Home::last();
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $homes = $this->homeService->all();
        if ($homes){
            return response()->json([
                'success'=>true,
                'data'=>$homes,
                'message'=>"Liste des homes"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de home trouvé"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $home=$this->homeService->create($request->all());
        if ($home){

            $arr=ImageHelper::decodeBase64Image($request->input('doctor_image'));
            $home->addMediaFromBase64($arr['base64Image'])
                ->usingFileName($arr['filename'])
                ->toMediaCollection('home');
            return response()->json([
                'success'=>true,
                'data'=>$home,
                'message'=>"home inséré"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Erreur lors de l'insertion de home"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $home=$this->homeService->find($id);
        if ($home){
            return response()->json([
                'success'=>true,
                'data'=>$home,
                'message'=>"Home trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Home non trouvé"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $home=$this->homeService->update($request->all(),$id);
        if ($home){
            return response()->json([
                'success'=>true,
                'data'=>$home,
                'message'=>"Home mis à jour"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Erreur lors de la mise à jour du home"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $home=$this->homeService->delete($id);
        if ($home){
            return response()->json([
                'success'=>true,
                'data'=>$home,
                'message'=>"Home supprimé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Erreur lors de la suppression du home"
        ],Response::HTTP_NOT_FOUND);
    }
    public function getOneHome(){
        $home=$this->homeService->find($this->lastHome->id);
        if ($home){
            return response()->json([
                'success'=>true,
                'data'=>$home,
                'photo'=>$home->getFirstMediaUrl('home'),
                'message'=>"FrontEnd Home trouvé"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"FrontEnd Home inexistant"
        ],Response::HTTP_NOT_FOUND);
    }
}
