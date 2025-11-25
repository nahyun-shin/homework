package it.korea.app_boot.mapper;




import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Update;

import it.korea.app_boot.entity.Product;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Options;

import java.util.List;

@Mapper
public interface ProductMapper {

    @Select("SELECT * FROM products")
    List<Product> findAll();

    @Select("SELECT * FROM products WHERE id = #{id}")
    Product findById(Integer id);

    @Insert("INSERT INTO products(name, price, stock) VALUES(#{name}, #{price}, #{stock})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(Product product);

    @Update("UPDATE products SET name=#{name}, price=#{price}, stock=#{stock} WHERE id=#{id}")
    int update(Product product);

    @Delete("DELETE FROM products WHERE id=#{id}")
    int delete(Integer id);
}

