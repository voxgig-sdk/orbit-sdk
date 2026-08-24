<?php
declare(strict_types=1);

// Orbit SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class OrbitMakeContext
{
    public static function call(array $ctxmap, ?OrbitContext $basectx): OrbitContext
    {
        return new OrbitContext($ctxmap, $basectx);
    }
}
