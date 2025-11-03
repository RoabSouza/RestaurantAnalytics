package com.restaurant.analytics.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(InvalidPeriodException.class)
	public ResponseEntity<ErrorResponse> handleInvalidPeriod(InvalidPeriodException ex, WebRequest request) {

		ErrorResponse error = new ErrorResponse(HttpStatus.BAD_REQUEST.value(), "Bad Request", ex.getMessage(),
				request.getDescription(false).replace("uri=", ""));

		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}

	// Tratamento para DataNotFoundException
	@ExceptionHandler(DataNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleDataNotFound(DataNotFoundException ex, WebRequest request) {

		ErrorResponse error = new ErrorResponse(HttpStatus.NOT_FOUND.value(), "Not Found", ex.getMessage(),
				request.getDescription(false).replace("uri=", ""));

		return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
	}

	// Tratamento para DatabaseException
	@ExceptionHandler(DatabaseException.class)
	public ResponseEntity<ErrorResponse> handleDatabaseException(DatabaseException ex, WebRequest request) {

		ErrorResponse error = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal Server Error",
				"Erro ao processar sua solicitação. Tente novamente mais tarde.",
				request.getDescription(false).replace("uri=", ""));

		System.err.println("Erro de banco de dados: " + ex.getMessage());
		if (ex.getCause() != null) {
			ex.getCause().printStackTrace();
		}

		return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	// Tratamento para Exception genérica
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorResponse> handleGenericException(Exception ex, WebRequest request) {

		ErrorResponse error = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal Server Error",
				"Ocorreu um erro inesperado. Nossa equipe foi notificada.",
				request.getDescription(false).replace("uri=", ""));

		System.err.println("Erro inesperado: " + ex.getMessage());
		ex.printStackTrace();

		return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	// Tratamento para IllegalArgumentException
	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<ErrorResponse> handleIllegalArgument(IllegalArgumentException ex, WebRequest request) {

		ErrorResponse error = new ErrorResponse(HttpStatus.BAD_REQUEST.value(), "Bad Request", ex.getMessage(),
				request.getDescription(false).replace("uri=", ""));

		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}
}