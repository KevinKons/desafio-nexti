package com.desafio.nexti.desafionexti.validators;

import org.springframework.stereotype.Component;

@Component
public class GeneralValidations {

    public void validateIdZeroOrNull(long id) throws Exception {
        if(id != 0 )
            throw new Exception("ID should be null or zero");
    }
}
