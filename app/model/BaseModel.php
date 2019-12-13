<?php


namespace app\model;


use think\Model;

class BaseModel extends Model
{
    /**
     * 查询一条（返回一维数组），不分页
     * $field 要查询的字段 （字符串）
     * $where 查询条件 （数组）
     */
    public function findOne(string $field,array $where = array())
    {
        return static::field($field)->where($where)->find();
    }

    /**
     * 查询多条（返回二维数组） 不分页
     * $field 要查询的字段 （字符串）
     * $where 查询条件    （数组）
     */
    public function findAll(string $field,array $where = array()) : object
    {
        return static::field($field)->where($where)->select();
    }

    /**
     * 分页查询
     * $field 要查询的字段 （字符串）
     * $where 查询条件    （数组）
     */
    public function pageFind(string $field,array $where = array()):object
    {
        return static::field($field)->where($where)->paginate();
    }

    /**
     * 联合分页查询
     * $field 要查询的字段 （字符串）
     * $where 查询条件    （数组）
     * $join  关联条件    （数组）
     */
    public function JoinPageFind(string $field,array $where = array(),array $join):object
    {
        return static::alias('a')->field($field)->where($where)->join($join)->paginate();
    }

    /**
     * 联合不分页查询
     * $field 要查询的字段 （字符串）
     * $where 查询条件    （数组）
     * $join  关联条件    （数组）
     */
    public function JoinFind(string $field,array $where = array(),array $join):object
    {
        return static::alias('a')->field($field)->join($join)->all();
    }


    /**
     * 联合分页查询
     * $field 要查询的字段 （字符串）
     * $where 查询条件    （数组）
     * $join  关联条件    （数组）
     */
    public function JoinFindOne(string $field,array $where = array(),array $join):object
    {
        return static::alias('a')->field($field)->where($where)->join($join)->find();
    }

    /**
     * 保存数据
     */
    public function saveOne(array $data,array $condition = []):int
    {
        return static::save($data,$condition);
    }

    /**
     * 获取单个值
     */
    public function findValue(string $field,array $condition = [],array $join = [])
    {
        if (empty($join)) {

            return static::where($condition)->value($field);
        }

        $sql = static::alias('a')->where($condition);
        foreach ($join as $key => $value) {
            if (is_array($value) && 2 <= count($value)) {
                $sql->join($value[0], $value[1]);
            }
        }

        return $sql->value($field);

    }


}