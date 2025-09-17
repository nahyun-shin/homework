package it.korea.app_boot.common.files;
import java.awt.image.BufferedImage;
import javax.imageio.ImageIO;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;



import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.mortennobel.imagescaling.AdvancedResizeOp;
import com.mortennobel.imagescaling.MultiStepRescaleOp;

@Component
public class FileUtils {

    

   /** 
    * 파일 업로드 기능 
   */
    public Map<String, Object>  uploadFiles(MultipartFile file,  String filePath) throws Exception{ 
        Map<String, Object>   resultMap = new HashMap<>();

        if(file == null || file.isEmpty()) {
            return null;
        }

        String fileName = file.getOriginalFilename();
        String extention = fileName.substring(fileName.lastIndexOf(".")+1) ;
        String randName = UUID.randomUUID().toString().replaceAll("-", "").substring(0, 16);
        String storedFileName = randName + "." + extention;

        
        String fullPath = filePath + storedFileName;
        File newFile = new File(fullPath);

        //경로없으면 만들어주자
        if( !newFile.getParentFile().exists()) {
            //경로 만들어주기
            newFile.getParentFile().mkdirs();
        }

        newFile.createNewFile(); //빈파일
        file.transferTo(newFile);

        resultMap.put("fileName", fileName);
        resultMap.put("storedFileName", storedFileName);
        resultMap.put("filePath", filePath);

        return resultMap;
    }


    /**
     * 파일 삭제 
     */
    public void deleteFile(String filePath) throws Exception{
        File deleteFile = new File(filePath);

        if(deleteFile.exists()) {
            deleteFile.delete();
        }
    }

    /**
     *  썸네일 만들기 기능
     */

     public String thumbNailFile(int width, int heigth, File originFile, String thumbPath) throws Exception {
        String thumbFileName = "";

        String fileName = originFile.getName();
        String extention = fileName.substring(fileName.lastIndexOf(".")+1).toLowerCase() ;
        String randName = UUID.randomUUID().toString().replaceAll("-", "").substring(0, 16);
        thumbFileName = randName + "." + extention;

        try(
            InputStream in = new FileInputStream(originFile);
            BufferedInputStream bf = new BufferedInputStream(in);
        ){
            //원본 이미지 파일 뜨기
            BufferedImage originImage = ImageIO.read(originFile);
            //이미지 사이즈 줄이기
            MultiStepRescaleOp scaleImage = new MultiStepRescaleOp(width, heigth);
            //마스킹처리
            scaleImage.setUnsharpenMask(AdvancedResizeOp.UnsharpenMask.Soft);
            //리사이즈 이미지 생성
            
            String thubmbFilePath = thumbPath + thumbFileName;
            
            File resizeFile = new File(thubmbFilePath);
            
            BufferedImage resizeImage =scaleImage.filter(originImage, null);
            //경로없으면 만들어주자
            if( !resizeFile.getParentFile().exists()) {
                //경로 만들어주기
                resizeFile.getParentFile().mkdirs();   
            }
            boolean isWrite = ImageIO.write(resizeImage, extention, resizeFile);
            if(!isWrite){
                throw new RuntimeException("썸네일 생성 오류");
            }

        }catch (Exception e) {
            thumbFileName = null;
            e.printStackTrace();
            throw new RuntimeException("썸네일 생성 오류");
        }
        return thumbFileName;
     }
}
