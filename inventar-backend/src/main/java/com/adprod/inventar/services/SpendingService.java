package com.adprod.inventar.services;

import com.adprod.inventar.models.Spending;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

public interface SpendingService {
    ResponseEntity getExpenses(Pageable pageable, String user);
    ResponseEntity save(Spending expense);
    ResponseEntity getSpendObject(String id);
    ResponseEntity delete(String id);
    ResponseEntity update(String id, Spending expense);
}
