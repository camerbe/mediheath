<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    //
    /**
     * @return Middleware[]
     */
    public static function middleware(): array
    {
        return [
            new Middleware('auth:sanctum', except: ['login']),
        ];
    }

    /**
     * @param $token
     * @return JsonResponse
     */
    protected function respondWithToken($token): JsonResponse
    {
        return response()->json(
            [
                'token' => $token,

            ]);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request):JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $credentials = $request->only(['email', 'password']);
        $user = User::where('email', $request->email)->first();
        if ($user && Hash::check($request->password, $user->password))
        {

            $token=$this->respondWithToken(Auth::attempt($credentials));
            return response()->json([
                'success'=>true,
                'token'=>$token->original["token"],
                'message'=>"Login OK",

            ],Response::HTTP_OK);

        }
        return response()->json([
            'success'=>false,
            'user' => null,
            'token'=>null,
            'message'=>"Login failed"
        ],Response::HTTP_UNAUTHORIZED);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function logout(Request $request): JsonResponse
    {
        //dd($request->user()->currentAccessToken()->delete());
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            "success"=>true,
            "message"=>"Logout ok"
        ],Response::HTTP_OK);
    }
}
