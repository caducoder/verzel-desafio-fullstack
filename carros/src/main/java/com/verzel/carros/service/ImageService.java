package com.verzel.carros.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


@Service
public class ImageService {

	private final Path fileStorageLocation = Paths.get("/static/images").toAbsolutePath();
	
	public String uploadToLocalFileSystem(MultipartFile file) {
        
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        /*
        * verifica se existe a pasta. Se não existir, cria ela.
        */
        if(!Files.exists(fileStorageLocation)){
            try {
                Files.createDirectories(fileStorageLocation);
            }catch (Exception e){
                e.printStackTrace();
            }
        }

        Path destination = Paths.get(fileStorageLocation.toString() + "\\" + fileName);

        try {
            Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);

        } catch (IOException e) {
            e.printStackTrace();
        }
        
        // a resposta vai ser o link para a imagem
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/images/")
                .path(fileName)
                .toUriString();
       
        return fileDownloadUri;
    }

	public  byte[] getImageWithMediaType(String imageName) throws IOException {
        Path destination =   Paths.get(fileStorageLocation.toString()+"\\"+imageName);
        
        return IOUtils.toByteArray(destination.toUri());
    }
}
