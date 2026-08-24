<?php
declare(strict_types=1);

// Orbit SDK utility: result_body

class OrbitResultBody
{
    public static function call(OrbitContext $ctx): ?OrbitResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
