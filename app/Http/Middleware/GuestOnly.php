<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class GuestOnly
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(auth()->guest()) {
            if(!$request->isMethod(("GET"))) {
                return response()->json([
                    'Message' => 'Guest cannot access this feature, contact the developer. Thanks -Ichiroki'
                ], 403);
            }
        }

        return $next($request);
    }
}
