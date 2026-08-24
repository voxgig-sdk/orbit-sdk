<?php
declare(strict_types=1);

// Orbit SDK utility: prepare_body

class OrbitPrepareBody
{
    public static function call(OrbitContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
