<?php

namespace App\Http\Controllers\Core;

use App\Http\Controllers\Controller;
use App\Models\Core\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Helpers\UserHelper;
use Illuminate\Support\Str;

class AuthController extends Controller {
    public function register(Request $request): JsonResponse {
        $first_name = $request->input('first_name');
        $middle_name = $request->input('middle_name');
        $last_name = $request->input('last_name');
        $suffix = $request->input('suffix');
        $email = $request->input('email');
        $password = $request->input('password');
        $confirm_password = $request->input('confirm_password');
        $referral_code = $request->input('referral_code');
        $referrer_id = null;

        // check if email already exists
        if (User::where('email', $email)->exists()) {
            return response()->json(['message' => 'Email already exists'], 409);
        }

        // check if password and confirm password match
        if ($password !== $confirm_password) {
            return response()->json(['message' => 'Passwords do not match'], 400);
        }

        if (!empty($referral_code)) {
            // get the user with the referral_code
            $referrer = User::where('referral_code', $referral_code)->first();

            // invalid referral_code
            if (!$referrer) {
                return response()->json(['message' => 'Invalid refferal code'], 400);
            }

            $referrer_id = $referrer->id;
        }

        do {
            $userReferralCode = strtolower(Str::random(6));
        } while (User::where('referral_code', $userReferralCode)->exists());

        $user = User::create([
            'first_name' => $first_name,
            'middle_name' => $middle_name,
            'last_name' => $last_name,
            'suffix' => $suffix,
            'email' => $email,
            'password' => Hash::make($password),
            'referral_code' => $userReferralCode,
            'referrer_code' => $referral_code,
            'referrer_id' => $referrer_id,
            'account_type' => 'Customer',
        ]);

        return $this->respondWithTokens($user);
    }

    public function login(Request $request): JsonResponse {
        $user = User::where('email', $request->input('email'))->first();

        if (!$user || !Hash::check($request->input('password'), $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        return $this->respondWithTokens($user);
    }

    public function refreshToken(Request $request): JsonResponse {
        $refreshToken = $request->cookie('refresh_token');

        if (!$refreshToken) {
            return response()->json(['message' => 'Refresh token not found'], 401);
        }

        try {
            $user = JWTAuth::setToken($refreshToken)->authenticate();

            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }

            return $this->respondWithTokens($user);
        } catch (TokenExpiredException $e) {
            return response()->json(['message' => 'Refresh token expired'], 401);
        } catch (TokenInvalidException $e) {
            return response()->json(['message' => 'Invalid refresh token'], 401);
        } catch (JWTException $e) {
            return response()->json(['message' => 'Could not refresh token'], 500);
        }
    }

    private function respondWithTokens(User $user): JsonResponse {
        $authUser = UserHelper::getUser($user->email);

        $accessToken = $this->generateToken($authUser, config('jwt.ttl'));
        $refreshToken = $this->generateToken($authUser, config('jwt.refresh_ttl'));

        return response()->json([
            'user' => $user,
            'access_token' => $accessToken,
        ])->cookie(
            'refresh_token',
            $refreshToken,
            config('jwt.refresh_ttl'),
            '/',
            null,
            false,
            true
        );
    }

    private function generateToken(User $user, int $ttl): string {
        return JWTAuth::customClaims(['exp' => now()->addMinutes($ttl)->timestamp])->fromUser($user);
    }
}
