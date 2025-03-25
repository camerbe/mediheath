<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Services\TeamService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TeamController extends Controller
{
    protected TeamService $teamService;

    /**
     * @param TeamService $teamSevice
     */
    public function __construct(TeamService $teamService)
    {
        $this->teamService = $teamService;
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $teams = $this->teamService->all();
        if ($teams){
            return response()->json([
                'success'=>true,
                'data'=>$teams,
                'message'=>"Liste des teams"
            ],Response::HTTP_OK);
        }
        return response()->json([
            "success"=>false,
            "message"=>"Pas de team trouvé"
        ],Response::HTTP_NOT_FOUND);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
