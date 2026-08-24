<?php
declare(strict_types=1);

// Orbit SDK utility: result_headers

class OrbitResultHeaders
{
    public static function call(OrbitContext $ctx): ?OrbitResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
