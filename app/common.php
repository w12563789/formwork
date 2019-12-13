<?php
// 应用公共文件
/**
 * 传递数组进来  转化成树状形态的多维数组
 * @param array $data
 * @param int $pid
 * @param int $deep
 * @return array
 */
function  treeData(array $data, int $pid =0) : array
{
    $tree = array();
    foreach ($data as $row) {
        if($row['pid'] == $pid){
            $row['child'] = treeData($data,$row['id']);
            $row['target'] = '_self';
            $row['href'] = $row['condition'];
            if (empty($row['child'])) unset($row['child']);
            $tree[] = $row;
        }
    }
    return $tree;
}

